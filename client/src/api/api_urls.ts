const api_url = process.env.REACT_APP_API_URL;

export const TODO_LIST = () => `${api_url}/list`;
export const TODO_LIST_ID = (id: number) => `${api_url}/list/${id}`;
export const TODO_LIST_ARCHIVE = (id: number, archiveText: string) =>
  `${api_url}/list/${archiveText}/${id}`;

export const TODO_ITEM = (list_id: number) => `${api_url}/item/${list_id}`;

export const TODO_ITEM_ID = (list_id: number, item_id: number) =>
  `${api_url}/item/${list_id}/${item_id}`;
export const TODO_ITEM_COMPLETE = (
  list_id: number,
  item_id: number,
  completeText: string
) => `${api_url}/item/${list_id}/${completeText}/${item_id}`;
