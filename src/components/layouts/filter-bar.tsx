import { FilterIcon } from '@components/icons/filter-icon';
import { useTranslation } from 'next-i18next';
import GroupsDropdownMenu from '@framework/groups/dropdown-menu';
import { useAtom } from 'jotai';
import { drawerAtom } from '@store/drawer-atom';

export default function FilterBar() {
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);

  return (
    <div className="sticky top-14 md:top-16 lg:top-22 h-14 md:h-16 z-10 flex xl:hidden items-center justify-between py-3 px-5 lg:px-7 bg-light border-t border-b border-border-200">
      <button
        onClick={() => setDrawerView({ display: true, view: 'FILTER_VIEW' })}
        className="flex items-center h-8 md:h-10 py-1 md:py-1.5 px-3 md:px-4 text-sm md:text-base bg-gray-100 bg-opacity-90 rounded border border-border-200 font-semibold text-heading transition-colors duration-200 focus:outline-none hover:border-accent-hover focus:border-accent-hover hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
      >
        <FilterIcon width="18" height="14" className="me-2" />
        {t('text-filter')}
      </button>
      {/* <GroupsDropdownMenu /> */}
    </div>
  );
}
