import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/system/domain/system_data.dart';

class SystemDataService with UiLoggy {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  late final DocumentReference _systemDataDoc;
  SystemData systemData = const SystemData();

  SystemDataService() {
    _systemDataDoc = _firestore.doc('systemdata').withConverter<SystemData>(
        fromFirestore: (snapshot, _) => SystemData.fromJson(snapshot.data()!),
        toFirestore: (SystemData data, _) => data.toJson());
  }

  Future<void> initialise () async {
    try {
      final doc = await _systemDataDoc.get();
      systemData = doc.data as SystemData;
    } catch (e) {
      // ignore: avoid_print
      print('Error reading system data ${e.toString()}');
      rethrow;
    }
  }

  Future<bool> update(SystemData club, String id) async {
    try {
      await _systemDataDoc.update(club.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
  }
}

final systemDataProvider = Provider((ref) =>  SystemDataService());
