
/**
 * Custom hook to scroll the page to the top whenever a route loaded.
 *
 * This hook listens to route changes using TanStack Router's subscription API
 * and ensures the page scrolls to the top when a new route loaded.
 *
 * Usage:
 * - Call this hook in a component that wraps your application (e.g., App or Layout).
 * - It automatically handles cleanup when the component unmounts.
 *
 * Dependencies:
 * - TanStack Router (`useRouter` required for this hook to work).
 *
 * @returns {void} This hook does not return anything.
 */
export function useBackToTop(): void {
  //const router = useRouter();
  //const search = useSearch({ strict: false });
  //
  //const unsubscribe = router.subscribe('onLoad', () => {
  //  //* Enhance UX by scrolling to the top of the thread list paging
  //  //* when clicking on the pagination
  //  const threadListPaging = document.querySelector<HTMLElement>(
  //    '[data-id="thread-list-paging"]'
  //  );
  //  //if (search.pageNo && threadListPaging) {
  //  //  threadListPaging.scrollIntoView({ behavior: 'smooth' });
  //  //  return;
  //  //}
  //
  //  window.scrollTo({ top: 0, behavior: 'smooth' });
  //});
  //
  //useEffect(() => {
  //  return () => {
  //    unsubscribe();
  //  };
  //}, [unsubscribe]);
}
