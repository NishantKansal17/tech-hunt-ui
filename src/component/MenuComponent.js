import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Header, SideMenu } from "simple-side-menu";
import PreloadedQuestionsComponent from "./PreloadedQuestionsComponent"
import CreateQuestionComponent from "./CreateQuestionComponent"
import ShowTechHuntQuestionPapers from "./ShowTechHuntQuestionPapers"
import TechHuntEmailComponent from "./TechHuntEmailComponent"
import MENU_ITEMS from "./menu";

class MenuComponent extends PureComponent {
  state = {
    isOpen: true
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <Router>
        <Container>
          <SideMenu
            isOpen={this.state.isOpen}
            header={<Header title="Operations" />}
            items={MENU_ITEMS}
          />
          <div className="main">
            <button onClick={this.toggleMenu}>
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
            </button>
            <Route path="/preloadedquestions" component={PreloadedQuestionsComponent} />
            <Route path="/createquestion" component={CreateQuestionComponent} />
            <Route path="/preloadedpapers" component={ShowTechHuntQuestionPapers} />
            <Route path="/emailquestion" component={TechHuntEmailComponent} />
        </div>
        </Container>
      </Router>
    );
  }
}

const RoutePath = ({ path }) => <h4>{path}</h4>;

// const LoadQuestions = () => <RoutePath path="/preloadedquestions" />;
// const CreateQuestion = () => <RoutePath path="/createquestion" />;

export default MenuComponent;
