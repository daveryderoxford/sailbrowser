import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
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

  /// Initialise read of system data.  
  /// awaiting in this will wait until we are online before returnubng
  /// TODO TBC if this behaviour is desirable
  Future<void> initialise() async {

      final doc = await _systemDataDoc
          .get()
          .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'initialise'));
      systemData = doc.data as SystemData;

  }

  update(SystemData club, String id)  {
    _systemDataDoc.update(club.toJson())
       .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'update'));
  }

  _errorHandler(Object? error, StackTrace stackTrace, String func) {
    final s =
        (error == null) ? error.toString() : 'Error encountered Series.  $func';
    SnackBarService.showErrorSnackBar(content: s);
    loggy.error(s);
  }
}

final systemDataProvider = Provider((ref) => SystemDataService());
