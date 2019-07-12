import Axios from "axios";
import request from "./request";
import AsyncStorage from 'react-native';
import { Alert } from 'react-native';


export function createEvent(post) {
  return Axios.post("/events", post, {
    headers: { "x-access-token": AsyncStorage.getItem("token") }
  }).then(({ data: { id } }) => {
 
    if (post.image) {
      const formData = new FormData();
      for (let i = 0; i < post.image.length; i++) {
        formData.append("eventimage", post.image[i]);
      }
      return Axios.put(`/events/${id}/img`, formData, {
        headers: { "x-access-token": AsyncStorage.getItem("token") }
      });
    } else {
      return Promise.resolve();
    }
  });
}

export function getEvents(statusEvent) {
  if (statusEvent === 0) {
    return request({
      url: `/events`,
      method: "get"
    });
    return Axios.get("/events", {
      headers: { "x-access-token": AsyncStorage.getItem("token") }
    });
  } else {
    return request({
      url: `/events?statusEvent=${statusEvent}`,
      method: "get"
    });
  }
}
export function deleteEvent(id) {
  return request({
    url: `/event/` + id,
    method: "delete"
  })
    .then(response => {
      Alert.alert("Xóa thành công");
    })
    .catch(error => {
      Alert.alert("Xóa thất bại");
    });
}
export function getSpecificEvent(eventId) {
  return Axios.get(`/events/${eventId}`, {
    headers: { "x-access-token": AsyncStorage.getItem("token") }
  });
}

export function joinEvent(id) {
  return request({
    url: `/events/` + id + `/join`,
    method: "put"
  })
    .then(response => {
      Alert.alert("Thành công");
    })
    .catch(error => {
      Alert.alert("Thất bại");
    });
}

export function unjoinEvent(id) {
  return request({
    url: `/events/` + id + `/unjoin`,
    method: "put"
  })
    .then(response => {
      Alert.alert("Thành công");
    })
    .catch(error => {
      Alert.alert("Thất bại");
    });
}

export function getEventJoined(username) {
    return request({
      url: `/accounts/u/`+username+`/eventsjoin`,
      method: "get"
    })

  }