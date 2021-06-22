export enum RolesCategory {
  WEREWOLF,
  PROPHET,
  WITCH,
  HUNTER,
  FOOL,
  VILLAGER,
  KNIGHT,
  GUARD,
  JUPITER,
  WOLFKING,
  MUSTEE,
  WHITEWOLF,
}

export const getFullRolesCategory = (): RolesCategory[] =>
  Object.keys(RolesCategory)
    .filter((e) => {
      const regexp = /[0-9]/g;
      return regexp.test(e);
    })
    .map((c: string) => {
      return parseInt(c) as unknown as RolesCategory;
    });

type Validate = {
  result: boolean;
  errorMessage: string;
};

export const validateGameSetting = (roles: RolesCategory[]): Validate => {
  let roleCounts: any = {};
  const LEAST_PLAYERS = 5;
  const MOST_PLAYERS = 16;

  roles.forEach(
    (role) => (roleCounts[role] = roleCounts[role] ? roleCounts[role] + 1 : 1)
  );

  if (roles.length < LEAST_PLAYERS || roles.length > MOST_PLAYERS) {
    return {
      result: false,
      errorMessage:
        roles.length < LEAST_PLAYERS
          ? `You need more than ${LEAST_PLAYERS} Players`
          : 'Too much players',
    };
  }

  // Not allow following role to have more than 1
  let isValid = true;
  Object.keys(roleCounts).forEach((role) => {
    // turn enum into string then compare
    if (
      role !== JSON.stringify(RolesCategory.WEREWOLF as unknown as number) &&
      role !== JSON.stringify(RolesCategory.VILLAGER as unknown as number)
    ) {
      if (roleCounts[role] > 1) {
        isValid = false;
      }
    }
  });

  return {
    result: isValid,
    errorMessage: !isValid ? "You can't have more than one of this role" : '',
  };
};

export type Role = {
  color: string;
  chineseName: string;
  name: string;
  shortName: string;
};

const getRolesObj = (roles: RolesCategory): Role => {
  switch (roles) {
    case RolesCategory.WEREWOLF:
      return {
        name: 'werewolf',
        color: '#f54748',
        chineseName: '狼人',
        shortName: '狼',
      };
    case RolesCategory.PROPHET:
      return {
        name: 'prophet',
        color: '#ac66cc',
        chineseName: '预言家',
        shortName: '预',
      };
    case RolesCategory.WITCH:
      return {
        name: 'witch',
        color: '#ffaf48',
        chineseName: '女巫',
        shortName: '巫',
      };
    case RolesCategory.HUNTER:
      return {
        name: 'hunter',
        color: '#00818A',
        chineseName: '猎人',
        shortName: '猎',
      };
    case RolesCategory.FOOL:
      return {
        name: 'fool',
        color: '#87A7B3',
        chineseName: '白痴',
        shortName: '白痴',
      };
    case RolesCategory.VILLAGER:
      return {
        name: 'villager',
        color: '#CDC7BE',
        chineseName: '平民',
        shortName: '民',
      };
    case RolesCategory.KNIGHT:
      return {
        name: 'knight',
        color: '#F7BE16',
        chineseName: '骑士',
        shortName: '骑',
      };
    case RolesCategory.GUARD:
      return {
        name: 'guard',
        color: '#fc92e3',
        chineseName: '守卫',
        shortName: '守',
      };
    case RolesCategory.JUPITER:
      return {
        name: 'jupiter',
        color: '#feaea5',
        chineseName: '丘比特',
        shortName: '丘',
      };
    case RolesCategory.WOLFKING:
      return {
        name: 'werewolf king',
        color: '#7f2f26',
        chineseName: '狼王',
        shortName: '狼王',
      };
    case RolesCategory.MUSTEE:
      return {
        name: 'mustee',
        color: '#495464',
        chineseName: '混血儿',
        shortName: '混血',
      };
    case RolesCategory.WHITEWOLF:
      return {
        name: 'white wolf king',
        color: '#D0E8F2',
        chineseName: '白狼王',
        shortName: '白狼',
      };
  }
};

export default getRolesObj;
