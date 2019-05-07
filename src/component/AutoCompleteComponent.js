import React,{Component, Fragment} from "react";
import PropTypes from "prop-types";
import {InputGroup, FormControl} from "react-bootstrap"
import "../css/autoComplete.css"

class AutoComplete extends Component {

  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props)

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: this.props.defaultValue
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      userInput: props.defaultValue
    })
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );


    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput
    });
  }

  onClick = e => {

    this.props.onSelect(e.currentTarget.innerText)

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  }

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    let userInput = this.state.userInput
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      e.preventDefault();
      if(filteredSuggestions[activeSuggestion] != null) {
        userInput = filteredSuggestions[activeSuggestion]
      }
      this.props.onSelect(userInput)

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  }

  render() {

    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {
              filteredSuggestions.map((suggestion, index) => {
                let className;
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })
            }
          </ul>
        )
      } else {
        suggestionsListComponent  = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        )
      }
    }

    return (
      <Fragment>
        <InputGroup style={{width: "30%"}}>
          <FormControl
            placeholder="Enter Language"
            name="languageSuggestion"
            autoComplete="off"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {suggestionsListComponent}
        </InputGroup>
      </Fragment>
    )
  }
}

export default AutoComplete
