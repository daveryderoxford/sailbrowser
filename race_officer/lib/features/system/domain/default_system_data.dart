
import 'dart:convert';

import 'package:sailbrowser_flutter/features/system/domain/system_data.dart';

final defaultSystemData = SystemData.fromJson(jsonDecode(_json));

const _json = '''
{
  "handicaps": [
    {
      "name": "RYA PY",
      "handicapScheme": "py",
      "boats": [
        {
          "name": "420",
          "handicap": 1100,
          "source": "standard"
        },
        {
          "name": "2000",
          "handicap": 1114,
          "source": "standard"
        },
        {
          "name": "29er",
          "handicap": 897,
          "source": "standard"
        },
        {
          "name": "505",
          "handicap": 900,
          "source": "standard"
        },
        {
          "name": "Albacore",
          "handicap": 1037,
          "source": "standard"
        },
        {
          "name": "Alto",
          "handicap": 921,
          "source": "standard"
        },
        {
          "name": "B14",
          "handicap": 858,
          "source": "standard"
        },
        {
          "name": "Blaze",
          "handicap": 1033,
          "source": "standard"
        },
        {
          "name": "British Moth",
          "handicap": 1165,
          "source": "standard"
        },
        {
          "name": "Byte CII",
          "handicap": 1135,
          "source": "standard"
        },
        {
          "name": "Comet",
          "handicap": 1210,
          "source": "standard"
        },
        {
          "name": "Comet Trio (MK I)",
          "handicap": 1096,
          "source": "standard"
        },
        {
          "name": "Comet Trio(MK II)",
          "handicap": 1052,
          "source": "standard"
        },
        {
          "name": "Contender",
          "handicap": 969,
          "source": "standard"
        },
        {
          "name": "DEVOTI D-ONE",
          "handicap": 948,
          "source": "standard"
        },
        {
          "name": "Devoti D-Zero",
          "handicap": 1029,
          "source": "standard"
        },
        {
          "name": "Enterprise",
          "handicap": 1126,
          "source": "standard"
        },
        {
          "name": "Europe",
          "handicap": 1141,
          "source": "standard"
        },
        {
          "name": "Finn",
          "handicap": 1049,
          "source": "standard"
        },
        {
          "name": "Fireball",
          "handicap": 952,
          "source": "standard"
        },
        {
          "name": "Firefly",
          "handicap": 1174,
          "source": "standard"
        },
        {
          "name": "Flying Fifteen",
          "handicap": 1021,
          "source": "standard"
        },
        {
          "name": "GP14",
          "handicap": 1133,
          "source": "standard"
        },
        {
          "name": "Graduate",
          "handicap": 1120,
          "source": "standard"
        },
        {
          "name": "Hadron H2",
          "handicap": 1038,
          "source": "standard"
        },
        {
          "name": "Hornet",
          "handicap": 959,
          "source": "standard"
        },
        {
          "name": "Icon",
          "handicap": 976,
          "source": "standard"
        },
        {
          "name": "ILCA4/Laser 4.7",
          "handicap": 1210,
          "source": "standard"
        },
        {
          "name": "ILCA 6/Laser Radial",
          "handicap": 1150,
          "source": "standard"
        },
        {
          "name": "ILCA 7/laser",
          "handicap": 1101,
          "source": "standard"
        },
        {
          "name": "K1",
          "handicap": 1070,
          "source": "standard"
        },
        {
          "name": "K6",
          "handicap": 919,
          "source": "standard"
        },
        {
          "name": "Kestrel",
          "handicap": 1038,
          "source": "standard"
        },
        {
          "name": "Lark",
          "handicap": 1065,
          "source": "standard"
        },
        {
          "name": "Lightning 368",
          "handicap": 1160,
          "source": "standard"
        },
        {
          "name": "Megabyte",
          "handicap": 1072,
          "source": "standard"
        },
        {
          "name": "Merlin-Rocket",
          "handicap": 980,
          "source": "standard"
        },
        {
          "name": "Miracle",
          "handicap": 1194,
          "source": "standard"
        },
        {
          "name": "Mirror (D/H)",
          "handicap": 1387,
          "source": "standard"
        },
        {
          "name": "Mirror (S/H)",
          "handicap": 1377,
          "source": "standard"
        },
        {
          "name": "Musto Skiff",
          "handicap": 845,
          "source": "standard"
        },
        {
          "name": "National 12",
          "handicap": 1064,
          "source": "standard"
        },
        {
          "name": "OK",
          "handicap": 1104,
          "source": "standard"
        },
        {
          "name": "Optimist",
          "handicap": 1635,
          "source": "standard"
        },
        {
          "name": "Osprey",
          "handicap": 934,
          "source": "standard"
        },
        {
          "name": "Phantom",
          "handicap": 1002,
          "source": "standard"
        },
        {
          "name": "Rooster 8.1",
          "handicap": 1035,
          "source": "standard"
        },
        {
          "name": "RS100 8.4",
          "handicap": 1002,
          "source": "standard"
        },
        {
          "name": "RS 200",
          "handicap": 1046,
          "source": "standard"
        },
        {
          "name": "RS 300",
          "handicap": 965,
          "source": "standard"
        },
        {
          "name": "RS 400",
          "handicap": 940,
          "source": "standard"
        },
        {
          "name": "RS 500",
          "handicap": 966,
          "source": "standard"
        },
        {
          "name": "RS 600",
          "handicap": 920,
          "source": "standard"
        },
        {
          "name": "RS 700",
          "handicap": 845,
          "source": "standard"
        },
        {
          "name": "RS 800",
          "handicap": 799,
          "source": "standard"
        },
        {
          "name": "RS Aero 5",
          "handicap": 1136,
          "source": "standard"
        },
        {
          "name": "RS Aero 7",
          "handicap": 1063,
          "source": "standard"
        },
        {
          "name": "RS Aero 9",
          "handicap": 1010,
          "source": "standard"
        },
        {
          "name": "RS Feva XL",
          "handicap": 1248,
          "source": "standard"
        },
        {
          "name": "RS Tera PRO",
          "handicap": 1364,
          "source": "standard"
        },
        {
          "name": "RS Tera Sport",
          "handicap": 1445,
          "source": "standard"
        },
        {
          "name": "RS Vareo",
          "handicap": 1093,
          "source": "standard"
        },
        {
          "name": "RS Vision",
          "handicap": 1137,
          "source": "standard"
        },
        {
          "name": "Scorpion",
          "handicap": 1043,
          "source": "standard"
        },
        {
          "name": "Seafly",
          "handicap": 1071,
          "source": "standard"
        },
        {
          "name": "Solo",
          "handicap": 1142,
          "source": "standard"
        },
        {
          "name": "Solution",
          "handicap": 1096,
          "source": "standard"
        },
        {
          "name": "Streaker",
          "handicap": 1128,
          "source": "standard"
        },
        {
          "name": "Supernova",
          "handicap": 1077,
          "source": "standard"
        },
        {
          "name": "Tasar",
          "handicap": 1017,
          "source": "standard"
        },
        {
          "name": "Topper",
          "handicap": 1369,
          "source": "standard"
        },
        {
          "name": "Wanderer",
          "handicap": 1193,
          "source": "standard"
        },
        {
          "name": "Wayfarer",
          "handicap": 1105,
          "source": "standard"
        },
        {
          "name": "Byte CI",
          "handicap": 1210,
          "source": "standard"
        },
        {
          "name": "Buzz",
          "handicap": 1020,
          "source": "standard"
        },
        {
          "name": "Cadet",
          "handicap": 1430,
          "source": "standard"
        },
        {
          "name": "Canoe International",
          "handicap": 858,
          "source": "standard"
        },
        {
          "name": "Topper 4.2",
          "handicap": 1420,
          "source": "standard"
        },
        {
          "name": "Fusion pro",
          "handicap": 1300,
          "source": "standard"
        },
        {
          "name": "Fusion pro Spinnaker",
          "handicap": 1275,
          "source": "standard"
        },
        {
          "name": "RS Aero 6",
          "handicap": 1105,
          "source": "standard"
        },
        {
          "name": "A Class Cat",
          "handicap": 684,
          "source": "standard"
        },
        {
          "name": "Catapult",
          "handicap": 898,
          "source": "standard"
        },
        {
          "name": "Challenger",
          "handicap": 1173,
          "source": "standard"
        },
        {
          "name": "Dart 18",
          "handicap": 822,
          "source": "standard"
        },
        {
          "name": "Formula 18",
          "handicap": 670,
          "source": "standard"
        },
        {
          "name": "Hurricane 5.9 SX",
          "handicap": 695,
          "source": "standard"
        },
        {
          "name": "Spitfire",
          "handicap": 719,
          "source": "standard"
        },
        {
          "name": "Dart 15 / Sprint 15",
          "handicap": 926,
          "source": "standard"
        },
        {
          "name": "Dart 15 Sport / Sprint 15 Sport",
          "handicap": 904,
          "source": "standard"
        }
      ]
    }
  ]
}
''';