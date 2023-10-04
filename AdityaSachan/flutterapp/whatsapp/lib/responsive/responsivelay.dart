import 'package:flutter/material.dart';

class ResponsiveLayout extends StatelessWidget {
  final Widget mobilescreen;
  final Widget webscreen;
  ResponsiveLayout(
      {super.key, required this.mobilescreen, required this.webscreen});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: ((context, constraints) {
      if (constraints.maxWidth > 900) {
        return webscreen;
      } else {
        return mobilescreen;
      }
    } //mobilescreen
        ));
  }
}
