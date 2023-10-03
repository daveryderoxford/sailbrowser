import 'package:sailbrowser_flutter/features/system/domain/boat_class.dart';
import 'package:test/test.dart';

void main() {
  group('Boat name static functions', () {
    test('Static functions Alternate names split keeping whitesave', () {      
      expect(BoatClassName.alternateNames('Test 1'), equals(['Test 1']));
      expect(BoatClassName.alternateNames('Test 1/Test 2'), equals(['Test 1', 'Test 2']));
    });
  
      test('StartsWith strip whitesace', () {      
      expect(BoatClassName.startsWith('Test 1', 'Te'), equals(true));
      expect(BoatClassName.startsWith('T est 1', 'Te'), equals(true));
      expect(BoatClassName.startsWith('Test 1', 'es'), equals(false));
      expect(BoatClassName.startsWith('Test 1a', 'Test1'), equals(true));
    });

    test('StartsWith uses altername names', () {      
      expect(BoatClassName.startsWith('Test 1a/Test 2a', 'Test 2'), equals(true));
      expect(BoatClassName.startsWith('Test 1a/Test 2a', 'ia'), equals(false));
      expect(BoatClassName.startsWith('Test 1a/Test 2a', '2a'), equals(false));
    });

  });
}
