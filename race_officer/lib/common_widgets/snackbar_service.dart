
import 'package:flutter/material.dart';

/// Snackbar servive to allow snackbars to be shown without having a context. 
/// The scaffoldKey is registered with the MaterialApp
///  Call => SnackBarService.showSnackBar(content: 'This is snackbar'); or any custom message you want to display.
class SnackBarService {
  static final scaffoldKey = GlobalKey<ScaffoldMessengerState>();
  static void showSnackBar({required String content}) {
    scaffoldKey.currentState?.showSnackBar(SnackBar(content: Text(content)));
  }

  static void showErrorSnackBar({required String content}) {
    scaffoldKey.currentState?.showSnackBar(SnackBar(
      content: Text(content)
      ));
  }
}
