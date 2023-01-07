const api_url = 'http://localhost:5001';

export const TODO_LIST = () => `${api_url}/list`;
export const TODO_LIST_ID = (id: number) => `${api_url}/list/${id}`;
export const TODO_LIST_ARCHIVE = (id: number, archiveText: string) =>
  `${api_url}/list/${archiveText}/${id}`;
