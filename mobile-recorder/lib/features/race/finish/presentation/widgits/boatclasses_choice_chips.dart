import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class BoatClassChoiceChip extends ConsumerWidget {
  const BoatClassChoiceChip({
    super.key,
    required this.boatClass,
  });

  final String boatClass;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final competitors = ref.watch(racingCompetitorsProvider(true));
    final boatClasses = competitors.map((e) => e.boatClass).toList().unique();
    boatClasses.sort();

    return 
      boatClasses.isEmpty || boatClasses.length == 1
        ? const NullWidget()
        : SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Wrap(
              spacing: 5.0,
              children: boatClasses
                  .map(
                    (bc) => ChoiceChip(
                      label: Text(bc),
                      selected: (boatClass == bc),
                      onSelected: (bool selected) {
                        ref.read(compFilterProvider.notifier).boatClass =
                            (selected ? bc : null);
                        HapticFeedback.mediumImpact();
                      },
                    ),
                  )
                  .toList(),
            ),
        );
  }
}