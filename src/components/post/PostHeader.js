import React from "react";
import { Image, View } from 'react-native';
import { Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Left, Body } from 'native-base';
import format from 'date-fns/format';
class headerPost extends React.Component {
  constructor(props) {
    super(props);
  }
  // toggle(){
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }
  // toggleReport() {
  //   this.setState(prevState => ({
  //     modalReport: !prevState.modalReport
  //   }));
  // }

  // toggleSuccessReport() {
  //   this.setState(prevState => ({
  //     modalReport: !prevState.modalReport
  //   }));
  //   if(this.props.objectModel === "EVENT"){
  //      this.props.successReport(this.props.reporter,this.props.object, "Event", this.state.reportText )
  //   }else{
  //     this.props.successReport(this.props.reporter,this.props.object, "Post", this.state.reportText )
  //   }
   
  // }
  // toggleMenuPost() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  // }
  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  render() {
    return (
      <CardItem>
      <Left>
        <Thumbnail source={{uri:'http://172.105.113.23:3000/resources/' +this.props.user.avatar}} />
        <Body>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text>{this.props.user.name}</Text>
            <Text> đã chia sẻ một </Text>
            {this.props.type === "PLACE" ? (
              <Text style={{ color: "#008b8b" }}>Địa điểm</Text>
            ) : this.props.type === "DONATION" ? (
              <Text style={{ color: "#483d8b" }}>Quyên góp</Text>
            ) : this.props.type === "EVENT" ? (
              <Text style={{ color: "#48d1cc" }}>Sự kiện</Text>
            ) : (
              <Text style={{ color: "#008000" }}>Kỉ niệm</Text>
            )}
          </View>
          <Text note>{format(new Date(this.props.createdAt), "DD/MM/YYYY")}</Text>
          <Text>{this.props.address}</Text>
        </Body>
      </Left>
    </CardItem> 
     
    );
  }
}
export default headerPost;
