type IOptions = {
  page?: string;
  limit?: string;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

type IResults = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const paginationSortingHelper = (options: IOptions): IResults => {
  const page = Number(options.page ?? 1);
  const limit = Number(options.limit ?? 5);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default paginationSortingHelper;
