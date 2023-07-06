import 'package:flutter/material.dart';

class Destination {
  const Destination(this.icon, this.label);
  final IconData icon;
  final String label;
}

const List<Destination> destinations = <Destination>[
  Destination(Icons.home_outlined, 'Home'),
  Destination(Icons.article_outlined, 'Entries'),
  Destination(Icons.flag_outlined, 'Start'),
  Destination(Icons.timer_outlined, 'Finish'),
  Destination(Icons.emoji_events_outlined, 'Results'),
  Destination(Icons.more_horiz, 'Admin'),
];

