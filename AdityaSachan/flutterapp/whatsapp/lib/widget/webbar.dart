import 'package:flutter/material.dart';
import 'package:whatsapp/colors.dart';

class Webbar extends StatelessWidget {
  const Webbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: MediaQuery.of(context).size.height * 0.077,
        width: MediaQuery.of(context).size.height * 0.65,
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          border: Border(right: BorderSide(color: dividerColor)),
          color: webAppBarColor,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Colors.white,
            ),
            Row(children: [
              IconButton(
                onPressed: () {},
                icon: Icon(Icons.chat),
                color: Colors.grey,
              ),
              IconButton(
                onPressed: () {},
                icon: Icon(Icons.more_vert),
                color: Colors.grey,
              )
            ]),
          ],
        ));
  }
}
