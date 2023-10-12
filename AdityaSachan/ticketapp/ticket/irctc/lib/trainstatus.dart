

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

class Trainstatus extends StatefulWidget {
  const Trainstatus({super.key});

  @override
  State<Trainstatus> createState() => _TrainstatusState();
}

class _TrainstatusState extends State<Trainstatus> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
      
       centerTitle: true,
      backgroundColor: const Color.fromARGB(255, 8, 67, 115),
      title: Text(
        "TRAIN STATUS",
        style: GoogleFonts.josefinSans(fontSize: 50, color: Colors.white),
      ),
    ),
    body: Container(
     
                   
              color:        Colors.white,
                      
                     
                  
            
      child: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox( height: 40,),
            Padding(
        padding:
        const EdgeInsets.symmetric(horizontal: 408, vertical: 16),
        child: TextFormField(
          
          decoration: const InputDecoration(
        
            border: OutlineInputBorder(), labelText: "Enter TRAIN NUMBER"),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter Train number';
            }
            return null;
          },
           ),
        ),
        const SizedBox( height: 20,),
        ElevatedButton(onPressed: (){},style: ElevatedButton.styleFrom(backgroundColor:  const Color.fromARGB(255, 8, 67, 115),), child: const Text("Search",style:TextStyle(letterSpacing: 1),)
        ,),
          
           
          
              
        
            
            SizedBox( height:  MediaQuery.of(context).size.height,),
             Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text(
                  "MADE WITH",
                  style: GoogleFonts.poppins(),
                ),
                const Icon(
                  CupertinoIcons.heart_fill,
                  color: Colors.red,
                ),
                InkWell(
                  onTap: () async {
                    const url = 'https://github.com/Sachan-aditya';
                    // ignore: deprecated_member_use
                    if (await canLaunch(url)) {
                      // ignore: deprecated_member_use
                      await launch(url);
                    } else {
                      throw 'Could not launch $url';
                    }
                  },
                  child: Text(
                    "by Aditya Sachan",
                    style: GoogleFonts.caveat(
                        textStyle: const TextStyle(fontSize: 32)),
                  ),
                ),
              ]),
        
            
          ],
        ),
      ),
    ),
    );
  }
}

  