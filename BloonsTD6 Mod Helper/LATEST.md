- Fixed a performance issue with the background Task Scheduler
  - Also added new `ScheduleType.WaitForSecondsScaled` that is affected by fast-forward mode
- Added a `ModRoundSet.Rounds1Index` override that changes the behavior of the `ModifyRoundModels` methods to match the player facing 1, 2, 3 and not the internal 0, 1, 2.
  - This will become the default in a later Mod Helper update, just not this patch version since it's a breaking change