export class UpdateIsLoading{
  static readonly type = '[APPLICATION] UpdateIsLoading';
  constructor(){}
}

export class UpdateIsDarkMode{
  static readonly type ='[APPLICATION] UpdateIsDarkMode';
  constructor(){}
}

export class UpdateActiveUserId{
  static readonly type = '[APPLICATION] UpdateActiveUser';
  constructor(public payload:string){}
}

export class UpdateUserActive{
  static readonly type = '[APPLICATION] Update Current User';
  constructor(public payload:string){}
}
