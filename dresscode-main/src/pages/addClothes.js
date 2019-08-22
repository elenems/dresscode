// import React, { Component } from "react";
// import axios from "axios";

// const MAX_FILE_SIZE = 3000 * 1048; // 3MB

// export default class addClothes extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: null
//     };
//   }
//   onChangeHandler = event => {
//     this.setState({
//       selectedFile: event.target.files[0],
//       message: ""
//     });
//   };

//   onClickHandler = () => {
//     console.log(this.state.selectedFile);
//     if (this.state.selectedFile.size > MAX_FILE_SIZE) {
//       this.setState({ message: "File to big" });
//     } else if (
//       this.state.selectedFile !== "image/jpeg" ||
//       this.state.selectedFile !== "image/png"
//     ) {
//       this.setState({ message: "Upload image with jpg/png type" });
//     } else {
//       const data = new FormData();
//       data.append("file", this.state.selectedFile);
//       axios
//         .post(
//           "https://europe-west2-dresscode-691e5.cloudfunctions.net/api/addClothes?title=ss",
//           data
//         )
//         .then(() => {
//           console.log(true);
//         })
//         .catch(e => {
//           console.log(false);
//           this.setState({ message: e.response.data.error });
//           console.log(e.response.data.error);
//         });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <input type="file" name="file" onChange={this.onChangeHandler} />
//         <button
//           type="button"
//           className="btn btn-success btn-block"
//           onClick={this.onClickHandler}
//         >
//           Upload
//         </button>
//         {this.state.message}
//       </div>
//     );
//   }
// }
