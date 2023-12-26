import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import CommentItems from "./CommentItems";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader, EnterMessageCommentBar } from "../../components";

const Comment = (props) => {
  const [comments, setComments] = useState([
    {
      ID: "11",
      avatar: "https://i.pravatar.cc/100000",
      fulname: "du sờ nem",
      content:
        "To the person reading this, Good Luck! Dont stress, everything will be fine. No matter what difficulty you are facing right now, you can overcome it! You are strong and brave.🥰❤",
      dateSent: "20/10/1945",
      reply: '30',
    },
    {
      ID: "22",
      avatar: "https://i.pravatar.cc/1020",
      fulname: "du sờ nem",
      content:
        "To everyone working or studying along to this - keep going! Be brave and intrepid and you will overcome. Have a wonderful day ❤",
      dateSent: "20/10/1945",
      reply: '30',
    },
    {
      ID: "33",
      avatar: "https://i.pravatar.cc/10330",
      fulname: "du sờ nem",
      content: `To everyone who's studying with this music:

        Checklist: 
        
        • A bottle of water, at least 1 liter. Your brain works better if it has enough water and drinking helps you to concentrate💧
        
        • Your charger. You sometimes don't even notice that your device's battery is going down, so better have it plugged in all the time🔋
        
        • Your headphones. You will be able to focus more with headphones, because it blocks background noises. Also, if it's a late night study session, you won't wake up anyone🎧
        
        • a tea or coffee. Coffee keeps you awake, green or black tea can make you feel more awake as well.☕
        
        • Your study/work stuff:  your laptop/tablet/phone , a few pens, paper or whatever you need.⌨
        
        •Anything else you could need, what about a heat pad, a blanket, a good lamp, your pet so you have a study buddy 🐈
        
        Reminder : After an hour, you should stand up and walk a bit around. Better stop the music or put on different music for the break. Open your window, even if it's cold outside. Fresh air will make it better, trust me. 
        
        You could also lay your head down on your desk for ten minutes and listen to a podcast. Or, if you have to read a book, listen to the audiobook of it. You can also listen to the audiobook while doing another thing, that's even better than listening to music while reading the book.
        
        I hope y'all had a good day, if not, that's okay too. Remember to take care of yourself and try to get some sleep tonight 😴🧸
        
        Here are some affirmations i'm adding❤
        
        You are loved❤
        
        You are smart🧡
        
        You can take on the world💛
        
        You are accepted💚
        
        You are Beautiful/Handsome/Good looking/Cute/Stunning/etc💙`,
      dateSent: "20/10/1945",
      reply: '30',
    },
    {
      ID: "44",
      avatar: "https://i.pravatar.cc/104440",
      fulname: "du sờ nem",
      content:
        "This playlist soothes my aching heart. I feel like all this studying and endless writing is becoming easier - my last paper is almost complete and this amazing playlist was my sole companion throughout these endless nights :)This playlist soothes my aching heart. I feel like all this studying and endless writing is becoming easier - my last paper is almost complete and this amazing playlist was my sole companion throughout these endless nights :)This playlist soothes my aching heart. I feel like all this studying and endless writing is becoming easier - my last paper is almost complete and this amazing playlist was my sole companion throughout these endless nights :)This playlist soothes my aching heart. I feel like all this studying and endless writing is becoming easier - my last paper is almost complete and this amazing playlist was my sole companion throughout these endless nights :)        ",
      dateSent: "20/10/1945",
      reply: '30',
    },
    {
      ID: "55",
      avatar: "https://i.pravatar.cc/123456",
      fulname: "du sờ nem",
      content:
        "💝🤯🌚🌙🗿🍀(´▽`ʃ♡ƪ)(o゜▽゜)o☆(。﹏。)",
      dateSent: "20/10/1945",
      reply: '30',
    },
  ]);

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Bình luận trên bài đăng"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        textStyle={{fontSize: fontSizes.h4*0.96}}
      />

      <ScrollView style={styles.listContainer}>
        {comments.map((eachComment) => (
          <CommentItems
            comment={eachComment}
            key={eachComment.ID}
            onPress={() => {
              navigate("Reply", { comment: eachComment });
            }}
          />
        ))}
      </ScrollView>

      
      <EnterMessageCommentBar/>
    </View>
  );
};
export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
});
