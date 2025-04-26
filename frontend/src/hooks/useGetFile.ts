import { useQuery, QueryFunction } from "@tanstack/react-query";
import { axios } from '@/hooks/axios'

const fetchFile: QueryFunction<Blob, [string]> = async (context) => {
    const id = context.queryKey[0];
    const response = await axios.get(`/api/upload/${id}`);
    return response.data;
}

function useGetFile(id: string) {
    return useQuery({ queryKey: [id], queryFn: fetchFile });
}

export default useGetFile;
