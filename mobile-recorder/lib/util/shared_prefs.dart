import 'package:shared_preferences/shared_preferences.dart';

class SharedPrefsSingleton {
  static final SharedPrefsSingleton _instance =
      SharedPrefsSingleton._factory();

  late final SharedPreferences? _sharedPreferences;

  SharedPrefsSingleton._factory();

   /// Iniislase singletion shared preferences instance.
   /// Must be waited on before accessing the instance
  static init() async {
    _instance._sharedPreferences = await SharedPreferences.getInstance();
  }

  /// Get initilaised instance of shared preferences.  
  static SharedPreferences get instance =>
      (_instance._sharedPreferences == null) ? throw (Error()) : _instance._sharedPreferences!;
}
