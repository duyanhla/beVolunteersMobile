import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/Post/PostCard/PostCard";
import NewPost from "../../../components/Post/NewPost/NewPost";
import "./HomePage.css";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getNewfeed } from "../../../services/newfeed";
import { reportPost } from "../../../services/post.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { joinEvent, unjoinEvent } from "../../../services/event.service";

class HomePage extends Component {
  state = {
    data: [],
    update: false
  };

  componentDidMount = () => {
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

  onPostTypeChanged = async postType => {
    const data = await getNewfeed(postType)

    if(postType!=="ALL"){
      console.log(postType)
      this.setState({
        data: data.data.filter(
          d => d.type === postType
        )
      });
    }else{
      this.setState({data:data.data})
    }
  
     
  };

  successReport(reporter, object, objectModel, content) {
    const data = {
      reporter: reporter,
      object: object,
      objectModel: objectModel,
      content: content
    };
    reportPost(data);
  }
  joinToEvent = async id => {
    await joinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };
  unjoinEvent = async id => {
    await unjoinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <PageLayout
        title="news"
        hasMoreButton
        onPostTypeChanged={this.onPostTypeChanged}
      >
        {this.props.permission === "USER" && (
          <NewPost style={{ zIndex: 50, position: "relative" }} />
        )}

        {this.state.data.map(post => (
          <Post
            key={post.id}
            {...post}
            successReport={this.successReport}
            joinToEvent={this.joinToEvent}
            unjoinEvent={this.unjoinEvent}
          />
        ))}
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp }
  }
}) => ({ name, permission, exp });

export default withRouter(connect(mapStateToProps)(HomePage));
