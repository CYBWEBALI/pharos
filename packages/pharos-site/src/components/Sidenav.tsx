import { useLayoutEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import { withPrefix, useStaticQuery, graphql } from 'gatsby';

import handleLinkClick from '../utils/handleLinkClick';
import { siteBrand__title, siteBrand__subTitle, sidenav } from './Sidenav.module.css';

const Sidenav: FC = () => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useLayoutEffect(() => {
    const {
      PharosSidenav,
      PharosSidenavSection,
      PharosSidenavLink,
      PharosSidenavMenu,
      PharosLink,
    } = Pharos;

    const getLink = (pageName: string) => {
      return pageName.replace(/\s/g, '-').toLowerCase();
    };

    const createSidenavLink = (root: string, page: string, index: number) => {
      const url = `/${root}/${getLink(page)}`;
      return (
        <PharosSidenavLink
          key={index}
          href={url}
          isActive={window.location.pathname === withPrefix(url)}
          onClick={handleLinkClick}
        >
          {page}
        </PharosSidenavLink>
      );
    };

    const isExpanded = (root: string) => {
      return (
        typeof window !== `undefined` && window.location.pathname.startsWith(withPrefix(`/${root}`))
      );
    };

    const content = (
      <PharosSidenav className={sidenav}>
        <PharosLink href="/" slot="top" flex onClick={handleLinkClick}>
          <div>
            <div className={siteBrand__title}>{data.site.siteMetadata.title}</div>
            <div className={siteBrand__subTitle}>JSTOR&apos;s Design System</div>
          </div>
        </PharosLink>
        <PharosSidenavSection showDivider>
          <PharosSidenavLink
            href="/getting-started"
            isActive={window.location.pathname === withPrefix('/getting-started')}
            onClick={handleLinkClick}
          >
            Getting started
          </PharosSidenavLink>
          <PharosSidenavLink
            href="/help"
            isActive={window.location.pathname === withPrefix('/help')}
            onClick={handleLinkClick}
          >
            Help
          </PharosSidenavLink>
          <PharosSidenavLink href="https://github.com/ithaka/pharos" target="_blank" external>
            GitHub
          </PharosSidenavLink>
        </PharosSidenavSection>
        <PharosSidenavSection label="Brand Guidelines" showDivider>
          <PharosSidenavMenu label="Brand expressions" expanded={isExpanded('brand-expressions')}>
            {['Typography', 'Color', 'Imagery', 'Iconography'].map(
              createSidenavLink.bind(this, 'brand-expressions')
            )}
          </PharosSidenavMenu>
          <PharosSidenavMenu
            label="Content style guide"
            expanded={isExpanded('content-style-guide')}
          >
            {[
              'Voice and tone',
              'Web elements',
              'JSTOR terms',
              'Grammar and style',
              'Editing checklist',
            ].map(createSidenavLink.bind(this, 'content-style-guide'))}
          </PharosSidenavMenu>
        </PharosSidenavSection>
        <PharosSidenavSection label="Design System">
          <PharosSidenavLink
            href="/design-tokens"
            isActive={window.location.pathname === withPrefix('/design-tokens')}
            onClick={handleLinkClick}
          >
            Design tokens
          </PharosSidenavLink>
          <PharosSidenavMenu label="Components" expanded={isExpanded('components')}>
            {[
              'Component status',
              'Alert',
              'Button',
              'Breadcrumb',
              'Checkbox',
              'Combobox',
              'Dropdown Menu',
              'Dropdown Menu Nav',
              'Footer',
              'Header',
              'Heading',
              'Icon',
              'Input Group',
              'Link',
              'Loading Spinner',
              'Modal',
              'Pagination',
              'Progress Bar',
              'Radio Button',
              'Select',
              'Sidenav',
              'Tabs',
              'Toast',
              'Tooltip',
              'Text Input',
              'Textarea',
            ].map(createSidenavLink.bind(this, 'components'))}
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Styles" expanded={isExpanded('styles')}>
            {['Type styles'].map(createSidenavLink.bind(this, 'styles'))}
          </PharosSidenavMenu>
        </PharosSidenavSection>
      </PharosSidenav>
    );

    setDisplay(content);
  }, [Pharos, data]);

  return Display;
};

export default Sidenav;