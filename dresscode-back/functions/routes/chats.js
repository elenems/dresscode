const { db } = require("../util/admin");

exports.sendMessage = (req, res) => {
    const sender = req.body.from;
    const receiver = req.body.to;
    const message = {
        messageText: req.body.message,
        sender,
        receiver,
        postedAt: req.body.postedAt
    };
    const createdBy = req.body.createdBy;
    let chatDocId = sender + ' ' + receiver;

    if(!message.messageText.length){
        return res.status(400).json({error:"Message can't be empty"});
    }

    if(createdBy === receiver){
        chatDocId = receiver + ' ' + sender;
    }

    db.collection('chats').doc(chatDocId).get()
    .then(doc=>{
        if(!doc.exists){
          db.collection('chats').doc(chatDocId).set({
              creator: sender,
              consumer: receiver,
              messages:[message]
           })
           .then(()=>{
               db.collection('users').doc(sender).update({
                 chats:[{chatId:chatDocId,creator:sender, latestMessage:{...message, isRead:true}}]
               })
               db.collection('users').doc(receiver).get()
               .then(doc=>{
                   db.collection('users').doc(receiver).update({
                    chats:[{chatId:chatDocId, creator:sender, latestMessage:{...message, isRead:false}}],
                    unreadNotifications: parseInt(doc.data().unreadNotifications) + 1
                  })
               })
              return res.status(200).json({error:'no error'})
           })
        }else{
          const messages = doc.data().messages;
          messages.push(message);
          db.collection('chats').doc(chatDocId).update({
              messages
          })
          .then(()=>{
              db.collection('users').doc(receiver).get()
              .then(doc=>{
                 const chats = doc.data().chats;
                 for(let i =0; i < chats.length;i++){
                     if(chats[i]['chatId'] === chatDocId){
                         chats[i]['latestMessage'] = {...message, isRead:false};
                         break;
                     }
                 }
                 db.collection('users').doc(receiver).update({
                     chats,
                     unreadNotifications: parseInt(doc.data().unreadNotifications) + 1
                 })
              })
          })
          .then(()=>{
            db.collection('users').doc(sender).get()
            .then(doc=>{
               const chats = doc.data().chats;
               for(let i =0; i < chats.length;i++){
                   if(chats[i]['chatId'] === chatDocId){
                       chats[i]['latestMessage'] = {...message, isRead:true};
                       break;
                   }
               }
               db.collection('users').doc(sender).update({
                   chats
               })
            })
          })
          .then(()=>{
            return res.status(200).json({error:'no err'})
          })
        }
    })
    .catch(e=>{
        return res.status(400).json({error:'err'})
    })
}

exports.removeUserChat = (req, res) => {
    const chatId = req.body.chatId;
    const userId = req.body.userId;
    const userMessagerId = req.body.userMessagerId;

    db.collection('users').doc(userId).get()
    .then(doc=>{
        const chats = doc.data().chats;
        for(let i = 0;i < chats.length;i++){
            if(chats[i]['chatId'] === chatId){
                chats.splice(i,1);
                break;
            }
        }
        db.collection('users').doc(userId).update({
            chats
        })
    })
    .then(()=>{
        db.collection('users').doc(userMessagerId).get()
        .then(user=>{
            const chats = user.data().chats;
            for(let i = 0; i < chats.length; i++){
                if(chats[i]['chatId'] === chatId){
                    return res.status(200).json({message:'Removed chat from user success'})
                }
            }
            db.collection('chats').doc(chatId).delete();
            return res.status(200).json({message:'Removed chat success'})
        })
    })
    .catch(e=>{
        return res.status(400).json({message:'error removing chat'})
    })
}

exports.removeUnreadNotifications = (req, res) => {
  const userId = req.body.userId;
  db.collection('users').doc(userId).update({
    unreadNotifications: 0
  })
  .then(()=>{
      return res.status(200).json({message:'Notifications deleted'})
  })
  .catch(e=>{
    return res.status(400).json({error:'Notifications deletion error'})
  })
}

exports.setMessageRead = (req, res) => {
    const userId = req.body.userId;
    const chatId = req.body.chatId;
    db.collection('users').doc(userId).get()
    .then(user=>{
        const chats = user.data().chats;
        for(let i=0;i<chats.length;i++){
            if(chatId === chats[i]['chatId']){
                chats[i]['latestMessage']['isRead'] = true;
                break;
            }
        }
        db.collection('users').doc(userId).update({
            chats
        })
    })
    .then(()=>{
        return res.status(200).json({message:'success'})
    })
    .catch(e=>{
        return res.status(400).json({message:'failure'})

    })
}

exports.getChat = (req, res) => {
    db.collection('chats').doc(req.query.chatId).get()
    .then(doc=>{
        return res.status(200).json({id:doc.id, ...doc.data()})
    })
    .catch(e=>{
        return res.status(500).json({message:'Server error'})
    })
}