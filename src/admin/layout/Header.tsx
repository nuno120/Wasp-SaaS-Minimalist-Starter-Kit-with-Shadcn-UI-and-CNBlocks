import { type AuthUser } from 'wasp/auth';
import MessageButton from '../../messages/MessageButton';
import { cn } from '../../client/cn';
import DarkModeSwitcher from '../../client/components/DarkModeSwitcher';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'wasp/client/router';
import { CgProfile } from 'react-icons/cg';
import { TfiDashboard } from 'react-icons/tfi';
import { BiLogIn } from 'react-icons/bi';
import { logout } from 'wasp/client/auth';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  user: AuthUser;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuItemClass = `flex items-center gap-3.5 py-4 text-sm font-medium duration-300 ease-in-out text-gray-900 dark:text-white hover:text-yellow-500`;

  // User dropdown menu items
  const UserDropdownMenu = () => (
    <div className={cn(
      'absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:white dark:bg-boxdark dark:text-white',
      { hidden: !dropdownOpen }
    )}>
      <ul className='flex flex-col gap-5 border-b border-stroke py-4 dark:border-strokedark px-6'>
        <li>
          <Link to={routes.AccountRoute.to} className={menuItemClass} onClick={() => setDropdownOpen(false)}>
            <CgProfile size='1.1rem' />
            Account Settings
          </Link>
        </li>
      </ul>

      {!!props.user?.isAdmin && (
        <ul className='flex flex-col gap-5 border-b border-stroke py-4 dark:border-strokedark px-6'>
          <li>
            <Link to={routes.AdminRoute.to} className={menuItemClass} onClick={() => setDropdownOpen(false)}>
              <TfiDashboard size='1.1rem' />
              Admin Dashboard
            </Link>
          </li>
        </ul>
      )}

      <div className='px-6 py-4'>
        <button onClick={() => logout()} className={menuItemClass}>
          <BiLogIn size='1.1rem' />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <header className='sticky top-0 z-999 flex w-full bg-white dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center justify-between sm:justify-end sm:gap-5 px-8 py-5 shadow '>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className='z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'
          >
            <span className='relative block h-5.5 w-5.5 cursor-pointer'>
              <span className='du-block absolute right-0 h-full w-full'>
                <span
                  className={cn(
                    'relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white',
                    {
                      '!w-full delay-300': !props.sidebarOpen,
                    }
                  )}
                ></span>
                <span
                  className={cn(
                    'relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white',
                    {
                      'delay-400 !w-full': !props.sidebarOpen,
                    }
                  )}
                ></span>
                <span
                  className={cn(
                    'relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white',
                    {
                      '!w-full delay-500': !props.sidebarOpen,
                    }
                  )}
                ></span>
              </span>
              <span className='absolute right-0 h-full w-full rotate-45'>
                <span
                  className={cn(
                    'absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white',
                    {
                      '!h-0': !props.sidebarOpen,
                    }
                  )}
                ></span>
                <span
                  className={cn(
                    'delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white',
                    {
                      '!h-0 !delay-200': !props.sidebarOpen,
                    }
                  )}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <ul className='flex items-center gap-2 2xsm:gap-4'>
          {/* <!-- Dark Mode Toggler --> */}
          <DarkModeSwitcher />
          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- Chat Notification Area --> */}
          <MessageButton />
          {/* <!-- Chat Notification Area --> */}

          {/* Add Feedback Link */}
          <li>
            <a href="/admin/feedback" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
              Feedback
            </a>
          </li>
          {/* End Add Feedback Link */}
        </ul>

        <div className='flex items-center gap-3 2xsm:gap-7'>
          {/* <!-- User Area --> */}
          <div className='relative'>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-4 duration-300 ease-in-out'
            >
              <span className='hidden text-right lg:block'>
                <span className='block text-sm font-medium text-black dark:text-white'>{props.user.username}</span>
              </span>
              <CgProfile size='1.1rem' className='text-black dark:text-white' />
            </button>
            <UserDropdownMenu />
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;