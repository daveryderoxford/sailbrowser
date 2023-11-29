import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

class TenantListData {
  String tenant;
  String name;
  TenantListData(this.tenant, this.name);
}

const _googleStorage = 'storage.googleapis.com';
const _tenantListURL = '/sailbrowser-efef0.appspot.com/system/clublist.txt';

/// Provider to read a list of club tenants from fixed, public Google Cloud storasge URL
final tenantListProvider = FutureProvider.autoDispose((ref) async {
  final response = await http.get(Uri.https(_googleStorage, _tenantListURL));

  final lines = const LineSplitter().convert(response.body);

  return lines.map((line) {
    final items = line.split(',');
    return TenantListData(items[0], items[1]);
  });
});
