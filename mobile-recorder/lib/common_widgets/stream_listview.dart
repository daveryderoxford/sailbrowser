import 'package:flutter/material.dart';

typedef StreamListItemBuilder<T> = Widget Function(
    BuildContext context, T item);

class StreamListView<T> extends StatelessWidget {
  final Stream<List<T>> itemStream;
  final StreamListItemBuilder itemBuilder;

  const StreamListView(
      {required this.itemStream, required this.itemBuilder, super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: StreamBuilder(
        stream: itemStream,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.error != null) {
            return const Center(
              child: Text('Some error occurred'),
            ); // Show an error just in case(no internet etc)
          }
          return _buildList(snapshot.data!);
        },
      ),
    );
  }

  Widget _buildList(List<T> items) {
    if (items.isNotEmpty) {
      return ListView.separated(
        itemCount: items.length,
        separatorBuilder: (BuildContext context, int index) => const Divider(),
        itemBuilder: (BuildContext context, int index) =>
            itemBuilder(context, items[index]),
      );
    } else {
      return const Center(child: Text('No items to display'));
    }
  }
}
