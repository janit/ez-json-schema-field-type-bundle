<?php

namespace EzJsonSchemaFieldTypeBundle\DependencyInjection;

use Symfony\Component\Config\Resource\FileResource;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\Yaml\Yaml;

class EzJsonSchemaFieldTypeExtension extends Extension implements PrependExtensionInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('fieldtypes.yml');
        $loader->load('indexable_fieldtypes.yml');
        $loader->load('field_value_converters.yml');
    }

    public function prepend(ContainerBuilder $container)
    {
        $container->prependExtensionConfig('assetic', array('bundles' => array('EzJsonSchemaFieldTypeBundle')));

        $config = Yaml::parse(__DIR__ . '/../Resources/config/field_templates.yml');
        $container->prependExtensionConfig('ezpublish', $config);

        $this->prependYui($container);
        $this->prependCss($container);
    }

    private function prependYui(ContainerBuilder $container)
    {
        $container->setParameter(
            'jsonschema_jsonschemafieldtype.public_dir',
            'bundles/ezjsonschemafieldtype'
        );
        $yuiConfigFile = __DIR__ . '/../Resources/config/yui.yml';
        $config = Yaml::parse(file_get_contents($yuiConfigFile));
        $container->prependExtensionConfig('ez_platformui', $config);
        $container->addResource(new FileResource($yuiConfigFile));
    }

    private function prependCss(ContainerBuilder $container)
    {
        $container->setParameter(
            'jsonschema_jsonschemafieldtype.public_dir',
            'bundles/ezjsonschemafieldtype'
        );
        $cssConfigFile = __DIR__ . '/../Resources/config/css.yml';
        $config = Yaml::parse(file_get_contents($cssConfigFile));
        $container->prependExtensionConfig('ez_platformui', $config);
        $container->addResource(new FileResource($cssConfigFile));
    }
}
