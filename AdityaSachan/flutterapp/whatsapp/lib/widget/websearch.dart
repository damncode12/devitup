import 'package:flutter/material.dart';
import 'package:whatsapp/colors.dart';

class Websearch extends StatelessWidget {
  const Websearch({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.06,
      width: MediaQuery.of(context).size.width * 0.25,
      decoration: BoxDecoration(
          border: Border(
        bottom: BorderSide(color: dividerColor),
      )),
      padding: EdgeInsets.all(3),
      child: TextField(
          decoration: InputDecoration(
              filled: true,
              fillColor: searchBarColor,
              prefixIcon: Padding(
                padding: EdgeInsets.symmetric(horizontal: 20),
                child: Icon(
                  Icons.search,
                  size: 20,
                ),
              ),
              hintStyle: TextStyle(fontSize: 14),
              hintText: 'search for zuck',
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide(width: 0, style: BorderStyle.none)))),
    );
  }
}
