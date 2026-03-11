import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/widgits/finish_find_tab.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/widgits/finish_list_tab.dart';

class FinishScreen extends StatelessWidget {
  const FinishScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveCenter(
      maxContentWidth: 850,
      child: DefaultTabController(
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
                FinishFindTab(),
                FinishListTab(racing: true),
                FinishListTab(racing: false),
              ],
            ),
          ),
        ),
    );
  }
}
