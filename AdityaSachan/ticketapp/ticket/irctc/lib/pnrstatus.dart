import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

class Pnrstatus extends StatefulWidget {
  const Pnrstatus({super.key});

  @override
  State<Pnrstatus> createState() => _PnrstatusState();
}

class _PnrstatusState extends State<Pnrstatus> {
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
        appBar: AppBar(
      
      centerTitle: true,
      backgroundColor: const Color.fromARGB(255, 8, 67, 115),
      title: Text(
        "PNR STATUS",
        style: GoogleFonts.josefinSans(fontSize: 50, color: Colors.white),
      ),
    ),
    body: Container(
                  
              color:        Colors.white,          
            
      child: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 80,),
            
           Padding(
        padding:
        const EdgeInsets.symmetric(horizontal: 408, vertical: 16),
        child: TextFormField(
          
          decoration: const InputDecoration(
        
            border: OutlineInputBorder(), labelText: "Enter PNR NUMBER",
            hintText: "ENTER 10 DIGIT PNR NUMBER"),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter PNR number';
            }
            return null;
          },
           ),
        ),
        const SizedBox( height: 10,),
        ElevatedButton(onPressed: (){},style: ElevatedButton.styleFrom(backgroundColor: const Color.fromARGB(255, 8, 67, 115),), child: const Text("Search",style:TextStyle(letterSpacing: 1),)
        ,),
          
              
        
            
            SizedBox(height: MediaQuery.of(context).size.height,),
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

  