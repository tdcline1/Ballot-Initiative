import { useMutation } from '@tanstack/react-query'
import { axios } from '@/hooks/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useOCR = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await axios.post(`/ocr`)
            return response.data
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { error: string })?.error)
        }
    })
}