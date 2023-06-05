import React, { Component } from 'react';
import { numbers, uppercaseletter, lowercaseletter, symbols } from './operation.js';
import { AiOutlineArrowRight } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "./Styles.scss";
import {BsFillClipboard2Fill} from "react-icons/bs";

class Passwordgen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordLength: '20',
      includeUppercase: false,
      includelowercase: false,
      includeNumbers: false,
      includeSymbols: false,
      passwordStrength: 'weak'
    };
  }

  handelGeneratePassword = () => {
    let characterList = '';

    if (this.state.includelowercase) {
      characterList = characterList + lowercaseletter;
    }

    if (this.state.includeUppercase) {
      characterList = characterList + uppercaseletter;
    }

    if (this.state.includeNumbers) {
      characterList = characterList + numbers;
    }

    if (this.state.includeSymbols) {
      characterList = characterList + symbols;
    }

    let generatedPassword = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < this.state.passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      generatedPassword = generatedPassword + characterList.charAt(characterIndex);
    }

    this.setState({ password: generatedPassword });
    this.calculatePasswordStrength();
  };

  copyToClipBoard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = this.state.password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
    toast.success("Copied to clipboard");
  };

  handelCopyPassword = () => {
    this.copyToClipBoard();
  };

  handlePasswordLengthChange = (e) => {
    this.setState({ passwordLength: e.target.value });
  };

  handelCheckBoxChange = (e) => {
    const checkBoxName = e.target.name;
    const checkBoxValue = e.target.checked;
    this.setState({ [checkBoxName]: checkBoxValue });
  };

  calculatePasswordStrength = () => {
    let strength = '';

    if (this.state.includeUppercase && this.state.includelowercase && this.state.includeNumbers && this.state.includeSymbols) {
      strength = 'strong';
    } else if (this.state.includeUppercase && this.state.includelowercase && this.state.includeNumbers) {
      strength = 'medium';
    } else {
      strength = 'weak';
    }

    this.setState({ passwordStrength: strength });
  };

  render() {
    const { password, passwordLength, includeUppercase, includelowercase, includeNumbers, includeSymbols, passwordStrength } = this.state;

    return (
      <div className="App">
        <div className='container'>
          <ToastContainer theme='light' className="toast" />
          <h2 className='password-header'>Password Generator</h2>
          <div className='generator'>
            <div className='password-box'>
              <h3>{password}</h3>
              <button onClick={this.handelCopyPassword} className='copy-btn'>
                <BsFillClipboard2Fill/>
              </button>
            </div>
          </div>

          <div className='form-group'>
            <label className='label'>Character Length</label>
            <span className='spanlength'> {passwordLength}</span>
                         <input
                           type='range'
                           className='range'
                           id='passwordLength'
                           name='passwordLength'
                           max={20}
                           min={6}
                           value={passwordLength}
                           onChange={this.handlePasswordLengthChange}
                         />
             
                         <div className="checkbox-group">
                           <label>
                             <input
                               type="checkbox"
                               name="includeUppercase"
                               checked={includeUppercase}
                               onChange={this.handelCheckBoxChange}
                             />
                             Include Uppercase Letters
                           </label>
                           <label>
                             <input
                               type="checkbox"
                               name="includelowercase"
                               checked={includelowercase}
                               onChange={this.handelCheckBoxChange}
                             />
                             Include Lowercase Letters
                           </label>
             
                           <label>
                             <input
                               type="checkbox"
                               name="includeNumbers"
                               checked={includeNumbers}
                               onChange={this.handelCheckBoxChange}
                             />
                             Include Numbers
                           </label>
                           <label>
                             <input
                               type="checkbox"
                               name="includeSymbols"
                               checked={includeSymbols}
                               onChange={this.handelCheckBoxChange}
                             />
                             Include Symbols
                           </label>
                         </div>
             
                         <div className="strength-section">
                           <p>Strength:</p>
                           <p className={passwordStrength === "medium" ? "medium" : passwordStrength === 'strong' ? "strong" : ""}>{passwordStrength}</p>
                           <div className="password-strength-bar">
                             <div className={`strength-level ${passwordStrength.toLowerCase()}`}>
                             </div>
                           </div>
                         </div>
             
                         <div className='generator-btn'>
                           <button className='generator-btn' onClick={this.handelGeneratePassword}>Generate <AiOutlineArrowRight id='arrow' /></button>
                         </div>
                       </div>
                     </div>
                   </div>
                 );
    }
   }
             
 export default Passwordgen;
             

