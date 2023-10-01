
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
          "name": "DEVOTI D-ZERO",
          "handicap": 1029,
          "source": "standard"
        },
        {
          "name": "ENTERPRISE",
          "handicap": 1126,
          "source": "standard"
        },
        {
          "name": "EUROPE",
          "handicap": 1141,
          "source": "standard"
        },
        {
          "name": "FINN",
          "handicap": 1049,
          "source": "standard"
        },
        {
          "name": "FIREBALL",
          "handicap": 952,
          "source": "standard"
        },
        {
          "name": "FIREFLY",
          "handicap": 1174,
          "source": "standard"
        },
        {
          "name": "FLYING FIFTEEN",
          "handicap": 1021,
          "source": "standard"
        },
        {
          "name": "GP14",
          "handicap": 1133,
          "source": "standard"
        },
        {
          "name": "GRADUATE",
          "handicap": 1120,
          "source": "standard"
        },
        {
          "name": "HADRON H2",
          "handicap": 1038,
          "source": "standard"
        },
        {
          "name": "HORNET",
          "handicap": 959,
          "source": "standard"
        },
        {
          "name": "ICON",
          "handicap": 976,
          "source": "standard"
        },
        {
          "name": "ILCA 4",
          "handicap": 1210,
          "source": "standard"
        },
        {
          "name": "ILCA 6",
          "handicap": 1150,
          "source": "standard"
        },
        {
          "name": "ILCA 7",
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
          "name": "KESTREL",
          "handicap": 1038,
          "source": "standard"
        },
        {
          "name": "LARK",
          "handicap": 1065,
          "source": "standard"
        },
        {
          "name": "LIGHTNING 368",
          "handicap": 1160,
          "source": "standard"
        },
        {
          "name": "MEGABYTE",
          "handicap": 1072,
          "source": "standard"
        },
        {
          "name": "MERLIN-ROCKET",
          "handicap": 980,
          "source": "standard"
        },
        {
          "name": "MIRACLE",
          "handicap": 1194,
          "source": "standard"
        },
        {
          "name": "MIRROR (D/H)",
          "handicap": 1387,
          "source": "standard"
        },
        {
          "name": "MIRROR (S/H)",
          "handicap": 1377,
          "source": "standard"
        },
        {
          "name": "MUSTO SKIFF",
          "handicap": 845,
          "source": "standard"
        },
        {
          "name": "NATIONAL 12",
          "handicap": 1064,
          "source": "standard"
        },
        {
          "name": "OK",
          "handicap": 1104,
          "source": "standard"
        },
        {
          "name": "OPTIMIST",
          "handicap": 1635,
          "source": "standard"
        },
        {
          "name": "OSPREY",
          "handicap": 934,
          "source": "standard"
        },
        {
          "name": "PHANTOM",
          "handicap": 1002,
          "source": "standard"
        },
        {
          "name": "ROOSTER 8.1",
          "handicap": 1035,
          "source": "standard"
        },
        {
          "name": "RS 100 8.4",
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
          "name": "RS AERO 5",
          "handicap": 1136,
          "source": "standard"
        },
        {
          "name": "RS AERO 7",
          "handicap": 1063,
          "source": "standard"
        },
        {
          "name": "RS AERO 9",
          "handicap": 1010,
          "source": "standard"
        },
        {
          "name": "RS FEVA XL",
          "handicap": 1248,
          "source": "standard"
        },
        {
          "name": "RS TERA PRO",
          "handicap": 1364,
          "source": "standard"
        },
        {
          "name": "RS TERA SPORT",
          "handicap": 1445,
          "source": "standard"
        },
        {
          "name": "RS VAREO",
          "handicap": 1093,
          "source": "standard"
        },
        {
          "name": "RS VISION",
          "handicap": 1137,
          "source": "standard"
        },
        {
          "name": "SCORPION",
          "handicap": 1043,
          "source": "standard"
        },
        {
          "name": "SEAFLY",
          "handicap": 1071,
          "source": "standard"
        },
        {
          "name": "SOLO",
          "handicap": 1142,
          "source": "standard"
        },
        {
          "name": "SOLUTION",
          "handicap": 1096,
          "source": "standard"
        },
        {
          "name": "STREAKER",
          "handicap": 1128,
          "source": "standard"
        },
        {
          "name": "SUPERNOVA",
          "handicap": 1077,
          "source": "standard"
        },
        {
          "name": "TASAR",
          "handicap": 1017,
          "source": "standard"
        },
        {
          "name": "TOPPER",
          "handicap": 1369,
          "source": "standard"
        },
        {
          "name": "WANDERER",
          "handicap": 1193,
          "source": "standard"
        },
        {
          "name": "WAYFARER",
          "handicap": 1105,
          "source": "standard"
        },
        {
          "name": "BYTE CI",
          "handicap": 1210,
          "source": "standard"
        },
        {
          "name": "BUZZ",
          "handicap": 1020,
          "source": "standard"
        },
        {
          "name": "CADET",
          "handicap": 1430,
          "source": "standard"
        },
        {
          "name": "CANOE INTERNATIONAL",
          "handicap": 858,
          "source": "standard"
        },
        {
          "name": "TOPPER 4.2",
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
          "name": "RS AERO 6",
          "handicap": 1105,
          "source": "standard"
        },
        {
          "name": "A CLASS CAT",
          "handicap": 684,
          "source": "standard"
        },
        {
          "name": "CATAPULT",
          "handicap": 898,
          "source": "standard"
        },
        {
          "name": "CHALLENGER",
          "handicap": 1173,
          "source": "standard"
        },
        {
          "name": "DART 18",
          "handicap": 822,
          "source": "standard"
        },
        {
          "name": "FORMULA 18",
          "handicap": 670,
          "source": "standard"
        },
        {
          "name": "HURRICANE 5.9 SX",
          "handicap": 695,
          "source": "standard"
        },
        {
          "name": "SPITFIRE",
          "handicap": 719,
          "source": "standard"
        },
        {
          "name": "Dart 15 / Sprint 15",
          "handicap": 926,
          "source": "standard"
        },
        {
          "name": "Dart 15 Sport / Sprint 15 SPORT",
          "handicap": 904,
          "source": "standard"
        }
      ]
    }
  ]
}
''';