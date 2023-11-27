import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavourite {
    listingId?: string;
    currentUser?: SafeUser | null;
}

const useFavourite = ({
    listingId = "",
    currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            let liked = false;
            if (hasFavourited) {
                // unlike it
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else{
                // like it
                request = () => axios.post(`/api/favorites/${listingId}`);
                liked = true;
            }
            await request();
            router.refresh();
            toast.success(`${liked ? 'Listing added to favourites' : 'Listing removed from favourites'}`);
        } catch(error: any) {
            toast.error(error.message);
        }
    }, [currentUser, hasFavourited, listingId, loginModal, router]);

    return {
        hasFavourited,
        toggleFavourite
    }
}

export default useFavourite;
