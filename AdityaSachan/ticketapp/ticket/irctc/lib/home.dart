import 'package:flutter/material.dart';
import 'package:irctc/navigation.dart';



class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
     backgroundColor: Colors.white
     ,
     body: SingleChildScrollView(
       child: Column(
         
        children: [
          Navigation(),
      
        ],
       ),
     ),

    );
  }
}
