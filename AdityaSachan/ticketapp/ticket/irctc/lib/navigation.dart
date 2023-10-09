import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:irctc/pnrstatus.dart';
import 'package:irctc/trainstatus.dart';
import 'package:url_launcher/url_launcher.dart';

class Navigation extends StatefulWidget {
  const Navigation({super.key});

  @override
  State<Navigation> createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {
  @override
  Widget build(BuildContext context) {
    // ignore: sized_box_for_whitespace
    return Column(
      children: [
        SizedBox(
          height: 100,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              SizedBox(
                height: 100,
                width: 150,
                child: Padding(
                  padding: const EdgeInsets.all(3.0),
                  child: Image.network(
                      'https://logos-download.com/wp-content/uploads/2019/11/Indian_Railway_Logo_2.png'),
                ),
              ),
              Column(
                children: [
                  Row(children: [
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xff2f4676)),
                      child: const Text(
                        'LOGIN',
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://contents.irctc.co.in/en/userregistration.html';

                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'REGISTER',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://www.operations.irctc.co.in/AgentInterface/loginHome.jsf';

                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'USER LOGIN',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://www.operations.irctc.co.in/AgentInterface/loginHome.jsf';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'AGENT LOGIN',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://www.emri.in/dial-100-police-emergency-service/';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'CONTACT US',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () {},
                      child: const Text(
                        'ASK DIKSHA',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                  ]),
                  Row(children: [
                    IconButton(
                        onPressed: () {},
                        icon: const Icon(
                          Icons.home,
                          color: Colors.black,
                        )),
                    ElevatedButton(
                      onPressed: () async {
                        const url =
                            'https://www.irctc.com/internet-ticketing.html';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xff2f4676)),
                      child: const Text(
                        'IRCTC EXCLUSIVE',
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url = 'https://enquiry.indianrail.gov.in/mntes/';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'TRAINS',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url = 'https://www.redbus.com/';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'BUSES',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url = 'https://www.oyorooms.com/';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'HOTELS',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url = 'https://www.oyorooms.com/';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'HOLIDAYS',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://contents.irctc.co.in/en/AboutIRCTCLoyaltyProgram.pdf';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'LOYALTY',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.transparent,
                      ),
                      onPressed: () async {
                        const url =
                            'https://www.railrecipe.com/?gclid=EAIaIQobChMI392Rz5HlgAMVAsd3Ch0HRQ7KEAAYASAAEgIi-vD_BwE';
                        // ignore: deprecated_member_use
                        if (await canLaunch(url)) {
                          // ignore: deprecated_member_use
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: const Text(
                        'MEALS',
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                  ]),
                ],
              ),
              Image.network(
                  'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IRCTC_Logo.svg/1200px-IRCTC_Logo.svg.png'),
            ],
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Stack(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.01,
              width: MediaQuery.of(context).size.height,
            ),
            Image.network(
              'https://pbs.twimg.com/ext_tw_video_thumb/1624038320551624705/pu/img/WcbY2ZCtoXoHYI9H.jpg:large',
              fit: BoxFit.contain,
            ),
            Column(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
              Container(
                alignment: Alignment.center,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "INDIAN RAILWAYS",
                        style: GoogleFonts.poppins(
                            textStyle: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                fontSize: 70)),
                      ),
                      Text(
                        "SECURE | SAFETY | PUNCTUALITY ",
                        style: GoogleFonts.poppins(
                            textStyle: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                fontSize: 30)),
                      ),
                    ]),
              ),
              Padding(
                padding: const EdgeInsets.all(108.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                        color: Colors.white,
                        height: 340,
                        width: 500,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextButton(
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (_) => const Trainstatus()));
                              },
                              style: TextButton.styleFrom(
                                  backgroundColor: Colors.white),
                              child: Text(
                                "TRAIN STATUS",
                                style: GoogleFonts.archivoBlack(
                                    fontWeight: FontWeight.bold,
                                    color:
                                        const Color.fromARGB(255, 10, 48, 113),
                                    letterSpacing: 1),
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            TextButton(
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (_) => const Pnrstatus()));
                              },
                              style: TextButton.styleFrom(
                                  backgroundColor: Colors.white),
                              child: Text(
                                "PNR STATUS",
                                style: GoogleFonts.archivoBlack(
                                    fontWeight: FontWeight.bold,
                                    color:
                                        const Color.fromARGB(255, 10, 48, 113),
                                    letterSpacing: 1),
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            InkWell(
                              onTap: () async {
                                const url = 'https://licindia.in/';
                                // ignore: deprecated_member_use
                                if (await canLaunch(url)) {
                                  // ignore: deprecated_member_use
                                  await launch(url);
                                } else {
                                  throw 'Could not launch $url';
                                }
                              },
                              child: Image.network(
                                  'https://www.91-cdn.com/hub/wp-content/uploads/2022/08/LIC-update-without-registration.png',
                                  fit: BoxFit.contain),
                            ),
                          ],
                        )),
                  ],
                ),
              )
            ]),
          ],
        ),
        const SizedBox(
          height: 25,
        ),
        const Divider(
          thickness: 1,
        ),
        const SizedBox(
          height: 25,
        ),
        InkWell(
          onTap: () async {
            const url =
                'https://www.sbicard.com/en/personal/credit-cards/travel/irctc-sbi-platinum-card.page';
            // ignore: deprecated_member_use
            if (await canLaunch(url)) {
              // ignore: deprecated_member_use
              await launch(url);
            } else {
              throw 'Could not launch $url';
            }
          },
          child: Image.network(
              'https://tpc.googlesyndication.com/simgad/2000023310277757485'),
        ),
        const SizedBox(
          height: 25,
        ),
        const Divider(
          thickness: 1,
          color: Color.fromARGB(255, 221, 210, 210),
        ),
        Column(
          children: [
            SizedBox(
              height: 120,
              child: Text(
                " Have you not found the right one?\nFind a service suitable for you here",
                style: GoogleFonts.balooDa2(
                    textStyle: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 30)),
              ),
            ),
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              const SizedBox(
                width: 10,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.airplane,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.train_style_one,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  Icons.restaurant,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.bus,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.house_alt_fill,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.phone,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.hand_draw,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  CupertinoIcons.ticket_fill,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  Icons.vaccines,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {

                },
                icon: const Icon(
                  CupertinoIcons.wifi,
                  color: Colors.black,
                  size: 56,
                ),
              ),
              const SizedBox(
                width: 50,
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(
                  Icons.image,
                  color: Colors.black,
                  size: 56,
                ),
              ),
            ]),
          ],
        ),
        const SizedBox(
          height: 15,
        ),
        SizedBox(
            width: MediaQuery.of(context).size.width,
            child: InkWell(
              onTap: () async {
                const url = 'https://www.shrikashivishwanath.org/';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              },
              child: Image.network(
                  'https://tpc.googlesyndication.com/simgad/16236829043843654934'),
            )),
        const Divider(
          thickness: 1,
        ),
        const SizedBox(
          height: 10,
        ),
        SizedBox(
            width: MediaQuery.of(context).size.width,
            child: InkWell(
              onTap: () async {
                const url = 'https://www.bobfinancial.com/irctc-card.jsp';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              },
              child: Image.network(
                  'https://tpc.googlesyndication.com/simgad/3781658789967630072'),
            )),
        Column(
          children: [
            Container(
              height: 60,
              color: Colors.purple,
              width: MediaQuery.of(context).size.width,
              child:
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                const Text('Get Connected to us on different platforms'),
                const SizedBox(
                  width: 10,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://www.facebook.com/IRCTCofficial/';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child: Image.network(
                    'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png',
                    fit: BoxFit.cover,
                    height: 40,
                  ),
                ),
                const SizedBox(
                  width: 5,
                ),
                   InkWell(
                  onTap:()async {
                const url = 'https://www.instagram.com/irctc.official/';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=512&id=Xy10Jcu1L2Su&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                 InkWell(
                  onTap:()async {
                const url = 'https://www.linkedin.com/company/irctc/?originalSubdomain=in';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=1x&id=13930&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),InkWell(
                  onTap:()async {
                const url = 'https://www.youtube.com/c/IRCTCOFFICIAL';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=512&id=19318&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://hitelegram.com/telegram-channel/irctc-official/';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=512&id=63306&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://twitter.com/IRCTCofficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=512&id=111057&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://www.kooapp.com/profile/irctcofficial';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=1x&id=GFxsfkisnW2q&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://www.ecatering.irctc.co.in/blog/order-online-food-by-whatsapp-irctc-ecatering-new-service';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=1x&id=16713&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                const SizedBox(
                  width: 5,
                ),
                InkWell(
                  onTap:()async {
                const url = 'https://in.pinterest.com/irctcofficial/';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=1x&id=63676&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),),
                 InkWell(
                  onTap:()async {
                const url = 'https://www.tumblr.com/irctcofficial';
                // ignore: deprecated_member_use
                if (await canLaunch(url)) {
                  // ignore: deprecated_member_use
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              } ,
                  child:
                Image.network(
                  'https://img.icons8.com/?size=1x&id=98g89qGUZFsT&format=png',
                  fit: BoxFit.cover,
                  height: 40,
                ),)
              ]),
            ),
          ],
        ),
        const SizedBox(
          height: 10,
        ),
        SizedBox(
          height: 60,
          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Image.network(
                'https://img.icons8.com/?size=512&id=68067&format=png'),
            Image.network(
                'https://img.icons8.com/?size=512&id=5RcHTSNy4fbL&format=png'),
            Image.network(
                'https://img.icons8.com/?size=512&id=SZ8HYUgmLcNc&format=png'),
            Image.network(
                'https://img.icons8.com/?size=512&id=OYtBxIlJwMGA&format=png'),
            Image.network(
                'https://img.icons8.com/?size=512&id=13608&format=png'),
            Image.network(
                'https://img.icons8.com/?size=512&id=5JTcb83oDGrE&format=png')
          ]),
        ),
        const SizedBox(
          height: 10,
        ),
        Container(
          alignment: Alignment.center,
          height: 70,
          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
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
        ),
      ],
    );
  }
}