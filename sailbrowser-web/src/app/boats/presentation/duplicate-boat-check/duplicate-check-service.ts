import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { BoatsDupDialogData, BoatsDuplicatesDialog } from './boats-duplicates-dialog';
import { Boat, BoatsStore } from 'app/boats';

@Injectable({
  providedIn: 'root'
})
export class DuplicateBoatCheck {
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private bs = inject(BoatsStore);

  async duplicateCheck(boat: Partial<Boat>): Promise<boolean> {

    const check = checkForDuplicateBoats(boat, this.bs.boats());

    if (check.isDuplicate) {
      this.snackbar.open("Duplicate Boat exists in boat repository", "Dismiss", { duration: 4000 });
      return false;
    } else if (check.matches.length > 0) {
      return await this.showDialog(boat as Boat, check.matches);
    }
    return true;
  }

  async showDialog(boat: Boat, dups: Boat[]): Promise<boolean> {

    const dialogRef = this.dialog.open<BoatsDuplicatesDialog, BoatsDupDialogData>(BoatsDuplicatesDialog, {
      data: { boat: boat, possibleDuplicates: dups },
    });
    return firstValueFrom(dialogRef.afterClosed());
  }
}

/** Checks for duplicate boats, returning a list of boats that
 * match exactly and ones that are similar to 
*/
function checkForDuplicateBoats(newBoat: Partial<Boat>, allBoats: Boat[]): { isDuplicate: boolean, matches: Boat[]; } {
  const possibles = allBoats.filter(
    boat => boat.boatClass === newBoat.boatClass &&
      boat.sailNumber === newBoat.sailNumber);

  const isDuplicate = possibles.find(boat => boat.helm.toLowerCase() === newBoat.helm?.toLowerCase()) !== undefined;

  return { isDuplicate, matches: possibles };
}