import React from "react";

const Header = (props) => (
    <header className="top">
    <h1>
      Catch 
      <span className="ofThe">
        <span className="of">of </span>
        <span className="the">the </span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span> 
      {/*this refers to the component instance (Header), .props is an object inside the component which contains all of our final properties (the tagline part)   */}
    </h3>
    </header>
  );








// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch 
//           <span className="ofThe">
//             <span className="of">of </span>
//             <span className="the">the </span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span> 
//           {/*this refers to the component instance (Header), .props is an object inside the component which contains all of our final properties (the tagline part)   */}
//         </h3>
//       </header>
//     )
//   }
// }

export default Header;