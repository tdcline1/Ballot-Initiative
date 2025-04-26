import { useMutation } from '@tanstack/react-query'
import { axios } from '@/hooks/axios'

export const useOCR = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await axios.post(`/ocr`)
            return response.data
        }
    })
}