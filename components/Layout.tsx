import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  AdjustmentsIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Context, { initialLayoutState } from "../lib/state";
import { useRouter } from "next/router";
import Link from "next/link";
import { Moment } from "moment";
import { IFilter } from "../lib/schema";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DateFilter = dynamic(() => import("./DateFilter"), {
  suspense: true,
});

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  {
    name: "Liked Posts",
    href: "/favourites",
    icon: FolderIcon,
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IProps {
  children: JSX.Element;
}

export default function Layout({ children }: IProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const router = useRouter();
  const [filter, setFilter] = useState<IFilter>({
    startDate: null,
    endDate: null,
  });

  const applyFilter = () => {
    setFilter({
      startDate: startDate,
      endDate: endDate,
    });
    setFilterOpen(false);
  };

  const resetFilter = () => {
    setStartDate(null);
    setEndDate(null);

    setFilter({
      startDate: null,
      endDate: null,
    });
    setFilterOpen(false);
  };

  return (
    <>
      <Context.Provider
        value={{
          search,
          setSearch,
          filter,
        }}
      >
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-14 w-auto"
                      src="https://www.labelblind.com/Final%20Logo_LabelBlind.jpg"
                      alt="LabelBlind"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.href}>
                          <a
                            key={item.name}
                            className={classNames(
                              router.asPath == item.href
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                router.asPath == item.href
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-2 bg-white overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4">
                <img
                  className="h-16 w-auto"
                  src="https://www.labelblind.com/Final%20Logo_LabelBlind.jpg"
                  alt="Labelblind"
                />
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.href}>
                      <a
                        key={item.name}
                        className={classNames(
                          router.asPath == item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="md:pl-64 flex flex-col flex-1">
            <div className="sticky top-0 z-10">
              <div className="flex-shrink-0 flex h-16 bg-white shadow">
                <button
                  type="button"
                  className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 px-4 flex justify-between">
                  <div className="flex-1 flex">
                    <form
                      className="w-full flex md:ml-0"
                      action="#"
                      method="GET"
                    >
                      <label htmlFor="search-field" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search-field"
                          className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          type="search"
                          name="search"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0"
                    >
                      <span className="sr-only">View notifications</span>
                      <AdjustmentsIcon
                        className={
                          "h-6 w-6 " + (filterOpen ? "text-blue-500" : "")
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {filterOpen ? (
                <Suspense fallback={<span className="m-4 text-gray-500">Loading...</span>}>
                  <div className="flex flex-col md:flex-row md:h-16 p-4 md:items-center bg-white shadow">
                    <p className="text-gray-500 text-sm mr-2 mb-2 md:mb-0">
                      Start Date
                    </p>
                    <DateFilter
                      date={startDate}
                      setDate={(d) => setStartDate(d as Moment)}
                    />
                    <p className="text-gray-500 text-sm mr-2 ml-4 mt-4 md:mt-0 mb-2 md:mb-0">
                      End Date
                    </p>
                    <DateFilter
                      minDate={startDate}
                      date={endDate}
                      setDate={(d) => setEndDate(d as Moment)}
                    />
                    <div className="flex-grow mt-4 md:mt-0" />
                    <div className="inline-flex flex-col md:flex-row-reverse">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={applyFilter}
                      >
                        Apply Filter
                      </button>
                      <button
                        className="py-2 px-4 text-blue-500 md:mr-2 mt-2 md:mt-0"
                        onClick={resetFilter}
                      >
                        Reset Filter
                      </button>
                    </div>
                  </div>
                </Suspense>
              ) : null}
            </div>
            <main className="flex-1">
              <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </Context.Provider>
    </>
  );
}
