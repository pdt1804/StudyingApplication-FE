import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import ChatbotItems from "./ChatbotItems";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import {} from "../../api";
import { information_getAllChatbots } from "../../api/ReNewStyle/informationController";

const fakeChatbots = [
  {
    information: {
      infoID: "001",
      fulName: "ChatGPT",
      image:
        "https://media.istockphoto.com/id/1445426863/vector/chat-bot-vector-logo-design-concept.jpg?s=612x612&w=0&k=20&c=XDdfzS4lNW9yxQ0BQGZq9KMLL4bJ8ywXlYdAhBSuoCA=",
    },
  },
  {
    information: {
      infoID: "002",
      fulName: "Jasper",
      image:
        "https://yt3.googleusercontent.com/8KsKNUVsjq-IDdVVTYhrdInCuXmpjyLbO7eZtdvefqmV5whXfoSJXOHBMcvhGkNMAspVFZwrGQ=s900-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    information: {
      infoID: "003",
      fulName: "GrammarlyGO",
      image:
        "https://images.ctfassets.net/lzny33ho1g45/1NjQCojVUOEArrfYSZtJSH/312c3f71ad0a2ea395980352de0339d0/grammarly.jpg",
    },
  },
  {
    information: {
      infoID: "004",
      fulName: "Copy.ai",
      image:
        "https://th.bing.com/th/id/OIP.Jx_5R1nZTBbOnrxCPI9cCwHaHa?pid=ImgDetMain",
    },
  },
  {
    information: {
      infoID: "005",
      fulName: "Copilot",
      image:
        "https://www.eway-crm.com/wp-content/uploads/2023/12/Copilot-studio_Obalka.jpg",
    },
  },
];

export default function ChatbotScreen(props) {
  const { navigate, goBack, push } = props.navigation;

  const [chatbots, setChatbots] = useState([]);

  const fetchData = async () => {
    try {
      setChatbots(await information_getAllChatbots());
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.userName]);

  const navigateToChatbotScreen = (chatbot) => {
    push("MessageBot", { chatbot: chatbot });
  };

  return (
    <View style={styles.container}>
      <UIHeader title={"Góc tự học".toUpperCase()} />

      <View style={styles.blank} />

      <FlatList
        data={chatbots} //Chỗ fakeChatbots này m sửa lại thành chatbots là oke nha
        numColumns={2}
        renderItem={({ item, index }) => (
          <ChatbotItems
            chatbot={item}
            key={index}
            onPress={() => navigateToChatbotScreen(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  blank: {
    height: "3%",
  },
});
