import 'package:flutter/material.dart';
import 'package:whatsapp/colors.dart';
import 'package:whatsapp/widget/inform.dart';
import 'package:whatsapp/widget/mobilechat.dart';

class Contact extends StatelessWidget {
  const Contact({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(top: 20),
        child: ListView.builder(
          shrinkWrap: true,
          itemCount: info.length,
          itemBuilder: (context, index) {
            return Column(
              children: [
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(
                        MaterialPageRoute(builder: (contex) => Mobilechat()));
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ListTile(
                        title: Text(info[index]['name'].toString(),
                            style: TextStyle(fontSize: 18)),
                        subtitle: Padding(
                          padding: EdgeInsets.only(top: 6),
                          child: Text(
                            info[index]['message'].toString(),
                            style: TextStyle(fontSize: 15),
                          ),
                        ),
                        leading: CircleAvatar(
                          radius: 32,
                          backgroundImage: NetworkImage(
                              info[index]['profilePic'].toString()),
                        ),
                        trailing: Text(info[index]['time'].toString(),
                            style:
                                TextStyle(fontSize: 13, color: Colors.grey))),
                  ),
                ),
                Divider(
                  color: dividerColor,
                  indent: 85,
                )
              ],
            );
          },
        ));
  }
}
