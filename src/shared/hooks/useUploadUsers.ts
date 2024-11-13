import  { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";

const useUploadUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const _sleep = (timeout: number) => new Promise((r) => setTimeout(() => r(setLoading(false)), timeout));

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async (currentPage: number) => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://reqres.in/api/users?page=${currentPage}`,
          { signal: controller.signal }
        );
        const fetchedUsers = response.data.data;

        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);

        setHasMore(response.data.page < response.data.total_pages);

        await _sleep(3000)

      } catch (err: unknown) {
        if (err instanceof Error && err.message === "canceled") return;

        setError(err instanceof Error ? err.message : "Something went wrong!");
        setLoading(false);
      }
    };

    fetchUsers(page);

    return () => {
      controller.abort();
    };
  }, [page]);

  return { users, loading, error, hasMore, setPage };
};

export default useUploadUsers;
