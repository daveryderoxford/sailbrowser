import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_entry.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_list.dart';

class FinishScreen extends StatelessWidget {
  const FinishScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            bottom: const TabBar(
              tabs: [
                Tab(text: 'Find'),
                Tab(text: 'All'),
                Tab(text: 'Finished'),
              ],
            ),
            title: const Text('Finish'),
          ),
          body: const TabBarView(
            children: [
              FinishEntry(),
              FinishList(racing: true),
              FinishList(racing: false),
            ],
          ),
        ),
      );
  }
}
