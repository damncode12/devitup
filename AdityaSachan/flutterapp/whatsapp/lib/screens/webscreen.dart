import 'package:flutter/material.dart';
import 'package:whatsapp/colors.dart';
import 'package:whatsapp/widget/chatlist.dart';
import 'package:whatsapp/widget/contact.dart';
import 'package:whatsapp/widget/webappchat.dart';
import 'package:whatsapp/widget/webbar.dart';
import 'package:whatsapp/widget/websearch.dart';

class Webscreen extends StatelessWidget {
  const Webscreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      Expanded(
        child: SingleChildScrollView(
          child: Column(children: [
            Webbar(),
            Websearch(),
            Contact(),
          ]),
        ),
      ),
      Container(
        width: MediaQuery.of(context).size.width * 0.75,
        decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage(
                  'assets/images/pexels-eberhard-grossgasteiger-1624438.jpg'),
              fit: BoxFit.cover),
        ),
        child: Column(
          children: [
            webchat(),
            Expanded(child: Chatlist()),
            Container(
              height: MediaQuery.of(context).size.height * 0.07,
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                  color: chatBarMessage,
                  border: Border(
                    bottom: BorderSide(color: dividerColor),
                  )),
              child: Row(children: [
                IconButton(
                    onPressed: () {},
                    icon: Icon(
                      Icons.emoji_emotions_outlined,
                      color: Colors.grey,
                    )),
                IconButton(
                    onPressed: () {},
                    icon: Icon(
                      Icons.attach_file,
                      color: Colors.grey,
                    )),
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(right: 15, left: 10),
                    child: TextField(
                      decoration: InputDecoration(
                          fillColor: searchBarColor,
                          filled: true,
                          hintText: "DONT TYPE HERE",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(20),
                              borderSide: BorderSide(
                                  width: 0, style: BorderStyle.none)),
                          contentPadding: EdgeInsets.only(left: 20)),
                    ),
                  ),
                ),
                IconButton(onPressed: () {}, icon: Icon(Icons.mic))
              ]),
            )
            //text message input box
          ],
        ),
      )
    ]));
  }
}
