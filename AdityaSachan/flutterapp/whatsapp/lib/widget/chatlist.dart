import 'package:flutter/material.dart';
import 'package:whatsapp/widget/inform.dart';
import 'package:whatsapp/widget/mychat.dart';
import 'package:whatsapp/widget/senderchat.dart';

class Chatlist extends StatelessWidget {
  const Chatlist({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: ((context, index) {
        if (messages[index]["isMe"] == true) {
          return Mymessage(
              message: messages[index]['text'].toString(),
              date: messages[index]['time'].toString());
        }
        return Sendermessage(
            message: messages[index]['text'].toString(),
            date: messages[index]['time'].toString());
      }),
      itemCount: messages.length,
    );
  }
}
