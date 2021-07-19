export enum Item {
	UserName = "username",
	RoomId = "roomId"
}

export type StoreItem = {
	username?: string,
	roomId?: string,
}

export const storeToSession = ({ username, roomId }: StoreItem): void => {
	username && sessionStorage.setItem(Item.UserName, username);
	roomId && sessionStorage.setItem(Item.RoomId, roomId);
}